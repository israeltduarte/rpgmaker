package br.isertech.com.contentback.service;

import br.isertech.com.contentback.client.ITUserClient;
import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITCharacterDTO;
import br.isertech.com.contentback.entity.ITCharacter;
import br.isertech.com.contentback.error.exception.CharacterNotFoundException;
import br.isertech.com.contentback.repository.CharacterRepository;
import br.isertech.com.contentback.util.ITCharacterTransformer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final ITUserClient itUserClient;

    public List<ITCharacter> getAllCharacters() {

        List<ITCharacter> characters = characterRepository.findAll();

        log.info("CharacterService - getAllCharacters() - List<ITCharacter>={}", characters);

        return characters;
    }

    public ITCharacter getCharacterById(String id) {

        ITCharacter character = characterRepository.findById(id)
                .orElseThrow(() -> new CharacterNotFoundException(Messages.CHARACTER_NOT_FOUND_INFO));

        log.info("CharacterService - getCharacterById() - ITCharacter={}", character);

        return character;
    }

    public ITCharacter addCharacter(ITCharacterDTO dto) {

        ITCharacter character = getNewCharacterEntityReady(dto);
        character = characterRepository.save(character);

        log.info("CharacterService - addCharacter() - ITCharacter={}", character);

        return character;
    }

    private ITCharacter getNewCharacterEntityReady(ITCharacterDTO characterDto) {

        LocalDateTime time = LocalDateTime.now();
        ITCharacter character = ITCharacterTransformer.fromDTO(characterDto);
        character.setCreated(time);
        character.setUpdated(time);

        return character;
    }

    public ITCharacter updateCharacter(String characterId, ITCharacterDTO dto) {

        ITCharacter character = characterRepository.findById(characterId)
                .orElseThrow(() -> new CharacterNotFoundException(Messages.CHARACTER_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();
        character = ITCharacterTransformer.fromDTO(dto);
        character.setId(character.getId());
        character.setUpdated(time);

        character = characterRepository.save(character);

        log.info("CharacterService - updateCharacter() - ITCharacter={}", character);

        return character;
    }

    public void deleteAllCharacters() {

        log.info("CharacterService - deleteAllCharacters() - ".concat(Messages.CHARACTERS_DELETED));

        characterRepository.deleteAll();
    }

    public void deleteCharacterById(String id) {

        log.info("CharacterService - deleteCharacterById() - ".concat(Messages.CHARACTER_DELETED));

        characterRepository.deleteById(id);
    }

}