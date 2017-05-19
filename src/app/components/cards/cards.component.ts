import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlashcardsService } from '../../services/flashcards.service';
import { Card } from '../../models/card';

@Component({
    selector: 'app-cards-list',
    template: `
        <div class="cards">
            <div class="controls">
                <a [routerLink]="['add']" class="add-card-btn"></a>
                <a *ngIf="cards.length" [routerLink]="['study']" class="study-deck-btn">Study Deck</a>
                <span *ngIf="cards.length" class="cards-count">
                    {{cards.length + ' card' + (cards.length > 1 ? 's' : '')}}
                </span>
            </div>

            <p *ngIf="!cards.length" class="intro">
                You have no cards in this deck. Create one!
            </p>

            <ul class="cards-list">
                <li class="cards-item" *ngFor="let card of cards">
                    <p class="cards-item-desc">{{card.front}}</p>
                    <a [routerLink]="['edit', card.id]" class="cards-item-edit">Edit</a>
                    <a [routerLink]="['study', card.id]" class="cards-item-study">Study</a>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['cards.component.scss']
})
export class CardsComponent implements OnInit {
    deckId:number = null;
    cards:Card[];

    constructor(private route:ActivatedRoute, private flashcardsService:FlashcardsService, private router:Router) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['deckId']) {
                this.deckId = +params['deckId'];
                this.cards = this.flashcardsService.getDeckCards(this.deckId);
            } else {
                this.cards = [];
            }
        });
    }
}