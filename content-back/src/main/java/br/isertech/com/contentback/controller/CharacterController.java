package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITCharacterDTO;
import br.isertech.com.contentback.entity.ITCharacter;
import br.isertech.com.contentback.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @GetMapping
    public ResponseEntity<List<ITCharacter>> getAllCharacters() {

        List<ITCharacter> characters = characterService.getAllCharacters();
        if (!characters.isEmpty()) {
            for (ITCharacter character : characters) {
                character.add(linkTo(methodOn(CharacterController.class).getCharacterById(character.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(characters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITCharacter> getCharacterById(@PathVariable String id) {

        ITCharacter character = characterService.getCharacterById(id);

        return ResponseEntity.status(HttpStatus.OK).body(character);
    }

    @GetMapping("/most-wanted")
    public ResponseEntity<List<ITCharacter>> getMostWantedCharacters() {

        List<ITCharacter> characters = characterService.getMostWantedCharacters();

        return ResponseEntity.status(HttpStatus.OK).body(characters);
    }

    @PostMapping
    public ResponseEntity<ITCharacter> addCharacter(@RequestBody ITCharacterDTO dto) {

        ITCharacter character = characterService.addCharacter(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(character);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITCharacter> updateCharacterById(@RequestBody ITCharacterDTO dto, @PathVariable String id) {

        ITCharacter character = characterService.updateCharacter(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(character);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllCharacters() {

        characterService.deleteAllCharacters();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacterById(@PathVariable String id) {

        characterService.deleteCharacterById(id);

        return ResponseEntity.ok().build();
    }

}
