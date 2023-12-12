import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from 'src/app/core/services/EvenementService';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import * as moment from 'moment';
import { Evenement } from 'src/app/core/models/Evenement.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DateClickArg } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})

export class CalendrierComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: any;
  events: any[] = [];
  idBibliotheque!: number;
  evenement!: Evenement;
  selectedEvent: any;
  formattedDate!: string;


  urlImage : string  = 'http://localhost:8080/images_events' ;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events,
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: this.eventDidMount.bind(this),

  };

  constructor(private evenementService: EvenementService , private route: ActivatedRoute, private router: Router ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idBibliotheque = params['idBibliotheque'];
      // Utilisez idBibliotheque pour charger les événements de la bibliothèque
      this.loadEvents(idBibliotheque);
    });
  }
  
  loadEvents(idBibliotheque: string): void {
    // Assurez-vous que idBibliotheque n'est pas undefined avant de faire la requête
    if (idBibliotheque) {
      // Faites la requête avec l'identifiant de la bibliothèque
      this.evenementService.getEventsByBibliotheque(idBibliotheque).subscribe(
        (events) => {
          console.log('Events:', events);
          this.events = events.map((event) => ({
            id: event.idEvenement,
            title: event.nomE,
            bibliotheque:Bibliotheque,
            date: moment(event.dateDebut).toISOString(),
            eventDetails: {
              bibliotheque:event.bibliotheque,
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
        error => {
          console.error('Error loading events:', error);
        }
      );
    } else {
      console.error('ID de la bibliothèque non défini');
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
  prepareEventData() {
    const dateDebut = this.selectedEvent?.eventDetails?.dateDebut;

    if (dateDebut !== null && dateDebut !== undefined) {
      this.formattedDate = moment(dateDebut).format('DD/MM/YY');
    } else {
      this.formattedDate = 'N/A';
    }
  }
  showEventDetailsPopup() {
    const bibliothequeName = this.selectedEvent.eventDetails?.bibliotheque?.nomB ;
  
    Swal.fire({
      title: this.selectedEvent.title,
      html: `
        <div>
          <img src="${this.urlImage}/${this.selectedEvent.eventDetails.idEvenement}/${this.selectedEvent.eventDetails.image}" alt="Image" style="max-width: 100%;">
        </div>
        <br>
        Date: ${this.formattedDate}
        <br>
        Lieu: ${this.selectedEvent.eventDetails.lieu}
        <br>
        Description: ${this.selectedEvent.eventDetails.description}
      `,
      confirmButtonText: 'Fermer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the "Fermer" button click
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancel button click
      } else if (result.dismiss === Swal.DismissReason.close) {
        // Handle the close button click
      }
  

    });
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
}