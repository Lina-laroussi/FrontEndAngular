import { Component, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from 'src/app/core/services/EvenementService';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DateClickArg } from '@fullcalendar/interaction';
import { AddevenementComponent } from 'src/app/admin/evenement/components/addevenement/addevenement.component';
import { Renderer2 } from '@angular/core';

import { Observable } from 'rxjs';
import { EtatEvenement } from 'src/app/core/models/etatEvenement.enum';
import { Evenement } from 'src/app/core/models/Evenement.model';
import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';
import { BiblioService } from 'src/app/core/services/BiblioService';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: any;
  events: any[] = [];
  selectedEvent: any;
  formattedDate!: string;
  urlImage : string  = 'http://localhost:8082/images_events' ;
  isEventFormVisible: boolean = false;
  nombibliotheque!:string
  //newEvent: any = {};

  newEvent = {
    bibliotheque:'',
    nomE: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    description: '',
    etatEvent: '',
    image: '',
  };


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events,
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: this.eventDidMount.bind(this),
    editable: true,
    eventDrop: this.handleEventDrop.bind(this),




  };

  constructor(private evenementService: EvenementService ,
     private router: Router ,
      private dialog: MatDialog,
      private renderer: Renderer2,
      private biblioService: BiblioService,
      ) 
  {

  }

  ngOnInit() {
    this.loadEvents();
    this.evenementService.selectedDate$.subscribe((selectedDate) => {
    
      if (selectedDate) {
        console.log(selectedDate)
        const originaldate = new Date(selectedDate);
      const formatteddateDebut =
      originaldate.getFullYear() +
        '-' +
        ('0' + (originaldate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + originaldate.getDate()).slice(-2);

        this.openAddEventDialog(formatteddateDebut);
        this.evenementService.resetSelectedDate();
      }
    });

  
  }
 
  loadEvents() {
    this.evenementService.getAllEvents().subscribe(
      (events) => {
        console.log('Events:', events);
        this.events = events.map((event) => ({
          id: event.idEvenement,
          title: event.nomE,
          bibliotheque:this.biblioService.getBibliothequeByEvenement(event.idEvenement).subscribe(
            result => {this.nombibliotheque=result.nomB}
          ),
          date: moment(event.dateDebut).toISOString(),
          eventDetails: {
            bibliotheque:this.nombibliotheque,
            idEvenement: event.idEvenement,
            dateDebut: event.dateDebut,
            dateFin: event.dateFin,
            lieu: event.lieu,
            description: event.description,
            etatEvent: event.etatEvent,
            image:event.image,
          },
        }));

        this.calendarOptions.events = this.events;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  handleEventDrop(arg: { event: EventApi; oldEvent: EventApi; el: HTMLElement; delta: any; revert: () => void }) {
    const eventId = parseInt(arg.event.id, 10);

    if (!eventId || isNaN(eventId)) {
      console.error('Error: Event ID is empty or invalid');
      arg.revert();
      return;
    }

    const newStartDate = arg.event.start;

    if (newStartDate !== null) {
      this.evenementService.updateEventStartDate(eventId, newStartDate).subscribe(
        (response) => {
          this.loadEvents();
        },
        (error) => {
          console.error('Error updating event start date:', error);
          arg.revert();
        }
      );
    } else {
      console.error('Error: newStartDate is null');
      arg.revert();
    }
  }

  handleDateClick(arg: DateClickArg) {
    try {
      const clickedDate = new Date(arg.date.setHours(0, 0, 0, 0));
      this.selectedEvent = this.events.find((event) =>
        moment(event.date).startOf('day').isSame(clickedDate)
      );

      if (this.selectedEvent) {
        this.prepareEventData();
        this.showEventDetailsPopup();
      }
      else { 
        this.evenementService.setSelectedDate(clickedDate);
      }
    } catch (error) {
      console.error('An error occurred in handleDateClick:', error);
    }
  }
  openAddEventDialog(selectedDate: string) {
    const dialogRef = this.dialog.open(AddevenementComponent, {
      data: { dateDebut: selectedDate },
      width: '800px',
      height: '2000px',
    });

    // Utilisation d'une propriété d'entrée pour communiquer avec le composant enfant
    dialogRef.componentInstance.parentData = 'Data que vous voulez passer au composant enfant';

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  prepareEventData() {
    const dateDebut = this.selectedEvent?.eventDetails?.dateDebut;

    if (dateDebut !== null && dateDebut !== undefined) {
      this.formattedDate = moment(dateDebut).format('DD/MM/YY');
    } else {
      this.formattedDate = 'N/A';
    }
  }
  navigateToEdit(id: number) {
    this.router.navigate(['/admin/evenement/updateevent', id]);
  }
    
    deleteEvent(idEvenement: number) {
      // Appelez la méthode deleteEvent du service
      this.evenementService.deleteEvent(idEvenement).subscribe(
        () => {
          console.log(`Evenement avec ID ${idEvenement} supprimé avec succès.`);
          this.loadEvents(); // Chargez à nouveau les événements après la suppression
        },
        (error) => {
          console.error(`Erreur lors de la suppression de l'événement avec ID ${idEvenement}:`, error);
        }
      );
    }
  
  
    showEventDetailsPopup() {
      const bibliothequeName = this.selectedEvent.eventDetails?.bibliotheque?.nomB ;
    
      Swal.fire({
        title: this.selectedEvent.title,
        html: `
          <div>
            <img src="${this.urlImage}/${this.selectedEvent.eventDetails.idEvenement}/${this.selectedEvent.eventDetails.image}" alt="Image" style="max-width: 100%;">
          </div>
          Bibliotheque: ${this.nombibliotheque}
          <br>
          Date: ${this.formattedDate}
          <br>
          Lieu: ${this.selectedEvent.eventDetails.lieu}
          <br>
          Description: ${this.selectedEvent.eventDetails.description}
        `,
        confirmButtonText: 'Fermer',
        footer: `
          <button class="btn btn-secondary" id="modifyBtn">Modifier</button>
          <button class="btn btn-danger" id="deleteBtn">Supprimer</button>
        `,
      }).then((result) => {

         // Add event listeners for the custom buttons
        /* const modifyBtn = document.getElementById('modifyBtn');
         console.log(modifyBtn)
         const deleteBtn = document.getElementById('deleteBtn');


        if (result.isConfirmed) {
          // Handle the "Fermer" button click
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle the cancel button click
        } else if (result.dismiss === Swal.DismissReason.close) {
          // Handle the close button click
        }
    
        if (modifyBtn) {
          modifyBtn.addEventListener('click', () => {
            // Handle modify button click
            console.log("clicked")
            this.modifyEvent();
          });
        }
    
        if (deleteBtn) {
          deleteBtn.addEventListener('click', () => {
            // Handle delete button click
            this.deleteEvent(this.selectedEvent.eventDetails.idEvenement);
          });
        }*/
      });
      document.body.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
    
        Swal.close();
        if (target.id === 'modifyBtn') {
          console.log("Modify button clicked");
          this.modifyEvent();
        }
    
        if (target.id === 'deleteBtn') {
          console.log("Delete button clicked");
          this.deleteEvent(this.selectedEvent.eventDetails.idEvenement);
        }
      });
  
    }

  
    modifyEvent() {
      console.log(this.selectedEvent.eventDetails.idEvenement)
      this.navigateToEdit(this.selectedEvent.eventDetails.idEvenement);
    }

 

  eventDidMount(arg: { event: EventApi; el: HTMLElement }) {
    const etatEvent = arg.event.extendedProps['eventDetails']?.etatEvent;

    if (etatEvent === 'ANNULE') {
      arg.el.style.backgroundColor = 'red';
      arg.el.style.color = 'white';
    } else if (etatEvent === 'REPORTE') {
      arg.el.style.backgroundColor = 'yellow';
    } else if (etatEvent === 'EN_COURS') {
      arg.el.style.backgroundColor = 'blue';
      arg.el.style.color = 'white';
    } else if (etatEvent === 'PLANIFIE') {
      arg.el.style.backgroundColor = 'green';
      arg.el.style.color = 'white';
    }
  }
  navigateToAdd() {
    this.router.navigate(['/admin/evenement/addevent']);
  }
 

  }
