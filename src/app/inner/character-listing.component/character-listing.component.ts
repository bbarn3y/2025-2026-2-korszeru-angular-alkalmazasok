import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  Signal,
  signal,
  viewChild,
  ViewChild
} from '@angular/core';
import {CharacterService} from '../../_services/character.service';
import {Character, ClassDetails} from '../../_models/character.model'
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-character-listing',
  standalone: false,
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent implements OnInit {
  // @ViewChild('searchInput') searchInput!: HTMLInputElement;
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput')

  private readonly characterService = inject(CharacterService);

  protected readonly ClassDetails = ClassDetails;

  readonly characters = this.characterService.characters;

  readonly searchQuery = signal('');
  readonly selectedCharacter = signal<Character | undefined>(undefined);

  // Filtering without debounce
  // readonly filteredCharacters: Signal<Character[]> = computed(() => {
  //   const query = this.searchQuery().toLowerCase();
  //   if (!query) return this.characters();
  //
  //   return this.characters()
  //     .filter(character => character.name.toLowerCase().includes(query));
  // });

  // Filtering with debounce
  readonly debouncedSearchQuery = signal('');
  readonly filteredCharacters: Signal<Character[]> = computed(() => {
    const query = this.debouncedSearchQuery().toLowerCase();
    if (!query) return this.characters();

    return this.characters()
      .filter(character => character.name.toLowerCase().includes(query));
  });

  constructor() {
    // effect((onCleanup) => {
    //   const query = this.searchQuery();
    //
    //   const handle = setTimeout(() => {
    //     this.debouncedSearchQuery.set(query);
    //   }, 1000);
    //
    //   onCleanup(() => clearTimeout(handle));
    // })

    toObservable(this.searchQuery)
      .pipe(
        debounceTime(1000),
        takeUntilDestroyed()
      ).subscribe((query) => {
          this.debouncedSearchQuery.set(query);
      })

    afterNextRender(() => {
      this.searchInput()?.nativeElement.focus();
    });
  }

  ngOnInit() {


  }

  // readonly mockCharacters: { name: string }[] = [
  //   {
  //     name: 'Mage Máté'
  //   },
  //   {
  //     name: 'Archer Ármin'
  //   }
  // ]

  protected readonly name = name;
}
