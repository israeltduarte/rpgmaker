package br.isertech.com.contentback.service;

import br.isertech.com.contentback.client.ITUserClient;
import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITCharacterDTO;
import br.isertech.com.contentback.entity.ITCharacter;
import br.isertech.com.contentback.entity.ITPower;
import br.isertech.com.contentback.error.exception.CharacterAttributesInvalidException;
import br.isertech.com.contentback.error.exception.CharacterNotFoundException;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.repository.CharacterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
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
    private final ModelMapper mapper;
    private final PowerService powerService;

    public Page<ITCharacter> getAllCharacters(Pageable pageable) {

        Page<ITCharacter> characters;

        try {
            characters = characterRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("CharacterService - getAllCharacters() - Page<ITCharacter>={}", characters);

        return characters;
    }

    public List<ITCharacter> getMostWantedCharacters() {

        List<ITCharacter> characters = characterRepository.findTop10ByRewardIsNotNullOrderByRewardDesc();

        log.info("CharacterService - getMostWantedCharacters() - List<ITCharacter>={}", characters);

        return characters;
    }

    public ITCharacter getCharacterById(String id) {

        ITCharacter character = characterRepository.findById(id)
                .orElseThrow(() -> new CharacterNotFoundException(Messages.CHARACTER_NOT_FOUND_INFO));

        log.info("CharacterService - getCharacterById() - ITCharacter={}", character);

        return character;
    }

    public ITCharacter addCharacter(ITCharacterDTO dto) {

        ITCharacter character = prepareNewEntity(dto);

        character = characterRepository.save(character);

        log.info("CharacterService - addCharacter() - ITCharacter={}", character);

        return character;
    }

    private ITCharacter prepareNewEntity(ITCharacterDTO dto) {

        ITCharacter character = mapper.map(dto, ITCharacter.class);

        switch (dto.getType()) {
            case PDM -> {
                character.setIsRival(dto.getIsRival());
            }
            case PDJ -> {
                character.setPlayerName(dto.getPlayerName());
            }
            default -> throw new CharacterAttributesInvalidException(Messages.CHARACTER_ATTRIBUTES_INVALID);
        }

        if (dto.getPowerId() != null && !dto.getPowerId().isEmpty()) {
            ITPower power = powerService.getPowerById(dto.getPowerId());
            character.setPower(power);
        }

        LocalDateTime time = LocalDateTime.now();
        character.setCreated(time);
        character.setUpdated(time);

        return character;
    }

    public ITCharacter updateCharacter(String characterId, ITCharacterDTO dto) {

        ITCharacter character = characterRepository.findById(characterId)
                .orElseThrow(() -> new CharacterNotFoundException(Messages.CHARACTER_NOT_FOUND_INFO));

        mapper.map(dto, character);

        LocalDateTime time = LocalDateTime.now();
        character.setId(characterId);
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
