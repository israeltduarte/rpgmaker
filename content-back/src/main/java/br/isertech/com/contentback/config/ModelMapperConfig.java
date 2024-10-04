package br.isertech.com.contentback.config;

import br.isertech.com.contentback.dto.*;
import br.isertech.com.contentback.entity.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {

        ModelMapper mapper = new ModelMapper();

        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldMatchingEnabled(true)
                .setSkipNullEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

        convertFromITCharacterDTOToITCharacter(mapper);
        convertFromITPowerDTOToITPower(mapper);
        convertFromITWeaponDTOToITWeapon(mapper);
        convertFromITGroupDTOToITGroup(mapper);
        convertFromITCityDTOToITCity(mapper);
        convertFromITOpponentDTOToITOpponent(mapper);
        convertFromITTaskDTOToITTask(mapper);

        return mapper;
    }

    private void convertFromITCharacterDTOToITCharacter(ModelMapper mapper) {
        mapper.createTypeMap(ITCharacterDTO.class, ITCharacter.class).addMappings(mapping -> {
            mapping.map(ITCharacterDTO::getName, ITCharacter::setName);
            mapping.map(ITCharacterDTO::getType, ITCharacter::setType);
            mapping.map(ITCharacterDTO::getReward, ITCharacter::setReward);
            mapping.map(ITCharacterDTO::getGoal, ITCharacter::setGoal);
            mapping.map(ITCharacterDTO::getNotes, ITCharacter::setNotes);
            mapping.map(ITCharacterDTO::getUpdated, ITCharacter::setUpdated);
            mapping.map(ITCharacterDTO::getCreated, ITCharacter::setCreated);
        });
    }

    private void convertFromITPowerDTOToITPower(ModelMapper mapper) {
        mapper.createTypeMap(ITPowerDTO.class, ITPower.class).addMappings(mapping -> {
            mapping.map(ITPowerDTO::getName, ITPower::setName);
            mapping.map(ITPowerDTO::getCategory, ITPower::setCategory);
            mapping.map(ITPowerDTO::getParticles, ITPower::setParticles);
            mapping.map(ITPowerDTO::getIdeas, ITPower::setIdeas);
            mapping.map(ITPowerDTO::getUpdated, ITPower::setUpdated);
            mapping.map(ITPowerDTO::getCreated, ITPower::setCreated);
        });
    }

    private void convertFromITWeaponDTOToITWeapon(ModelMapper mapper) {
        mapper.createTypeMap(ITWeaponDTO.class, ITWeapon.class).addMappings(mapping -> {
            mapping.map(ITWeaponDTO::getName, ITWeapon::setName);
            mapping.map(ITWeaponDTO::getType, ITWeapon::setType);
            mapping.map(ITWeaponDTO::getNotes, ITWeapon::setNotes);
            mapping.map(ITWeaponDTO::getTitles, ITWeapon::setTitles);
            mapping.map(ITWeaponDTO::getOwner, ITWeapon::setOwner);
            mapping.map(ITWeaponDTO::getPower, ITWeapon::setPower);
            mapping.map(ITWeaponDTO::getUpdated, ITWeapon::setUpdated);
            mapping.map(ITWeaponDTO::getCreated, ITWeapon::setCreated);
        });
    }

    private void convertFromITGroupDTOToITGroup(ModelMapper mapper) {
        mapper.createTypeMap(ITGroupDTO.class, ITGroup.class).addMappings(mapping -> {
            mapping.map(ITGroupDTO::getName, ITGroup::setName);
            mapping.map(ITGroupDTO::getLeader, ITGroup::setLeader);
            mapping.map(ITGroupDTO::getDescription, ITGroup::setDescription);
            mapping.map(ITGroupDTO::getNotes, ITGroup::setNotes);
            mapping.map(ITGroupDTO::getCreated, ITGroup::setCreated);
            mapping.map(ITGroupDTO::getUpdated, ITGroup::setUpdated);
        });
    }

    private void convertFromITCityDTOToITCity(ModelMapper mapper) {
        mapper.createTypeMap(ITCityDTO.class, ITCity.class).addMappings(mapping -> {
            mapping.map(ITCityDTO::getName, ITCity::setName);
            mapping.map(ITCityDTO::getLeader, ITCity::setLeader);
            mapping.map(ITCityDTO::getSize, ITCity::setSize);
            mapping.map(ITCityDTO::getCuriosities, ITCity::setCuriosities);
            mapping.map(ITCityDTO::getGroups, ITCity::setGroups);
            mapping.map(ITCityDTO::getPeople, ITCity::setPeople);
            mapping.map(ITCityDTO::getPlaces, ITCity::setPlaces);
            mapping.map(ITCityDTO::getNotes, ITCity::setNotes);
            mapping.map(ITCityDTO::getUpdated, ITCity::setUpdated);
            mapping.map(ITCityDTO::getCreated, ITCity::setCreated);
        });
    }

    private void convertFromITOpponentDTOToITOpponent(ModelMapper mapper) {
        mapper.createTypeMap(ITOpponentDTO.class, ITOpponent.class).addMappings(mapping -> {
            mapping.map(ITOpponentDTO::getName, ITOpponent::setName);
            mapping.map(ITOpponentDTO::getPower, ITOpponent::setPower);
            mapping.map(ITOpponentDTO::getHp, ITOpponent::setHp);
            mapping.map(ITOpponentDTO::getTac0, ITOpponent::setTac0);
            mapping.map(ITOpponentDTO::getCa, ITOpponent::setCa);
            mapping.map(ITOpponentDTO::getAbilities, ITOpponent::setAbilities);
            mapping.map(ITOpponentDTO::getWeapons, ITOpponent::setWeapons);
            mapping.map(ITOpponentDTO::getUpdated, ITOpponent::setUpdated);
            mapping.map(ITOpponentDTO::getCreated, ITOpponent::setCreated);
        });
    }

    private void convertFromITTaskDTOToITTask(ModelMapper mapper) {
        mapper.createTypeMap(ITTaskDTO.class, ITTask.class).addMappings(mapping -> {
            mapping.map(ITTaskDTO::getName, ITTask::setName);
            mapping.map(ITTaskDTO::getDescription, ITTask::setDescription);
            mapping.map(ITTaskDTO::getUpdated, ITTask::setUpdated);
            mapping.map(ITTaskDTO::getCreated, ITTask::setCreated);
        });
    }
}