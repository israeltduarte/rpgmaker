package br.isertech.com.contentback.config;

import br.isertech.com.contentback.dto.ITCharacterDTO;
import br.isertech.com.contentback.dto.ITPowerDTO;
import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITCharacter;
import br.isertech.com.contentback.entity.ITPower;
import br.isertech.com.contentback.entity.ITWeapon;
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

        return mapper;
    }

    private void convertFromITCharacterDTOToITCharacter(ModelMapper mapper) {
        mapper.createTypeMap(ITCharacterDTO.class, ITCharacter.class).addMappings(mapping -> {
            mapping.map(ITCharacterDTO::getName, ITCharacter::setName);
            mapping.map(ITCharacterDTO::getType, ITCharacter::setType);
            mapping.map(ITCharacterDTO::getReward, ITCharacter::setReward);
            mapping.map(ITCharacterDTO::getGoal, ITCharacter::setGoal);
            mapping.map(ITCharacterDTO::getPlayer, ITCharacter::setPlayer);
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
            mapping.map(ITWeaponDTO::getUpdated, ITWeapon::setUpdated);
            mapping.map(ITWeaponDTO::getCreated, ITWeapon::setCreated);
            mapping.map(ITWeaponDTO::getNotes, ITWeapon::setNotes);
            mapping.map(ITWeaponDTO::getTitles, ITWeapon::setTitles);
            mapping.map(ITWeaponDTO::getOwner, ITWeapon::setOwner);
            mapping.map(ITWeaponDTO::getPower, ITWeapon::setPower);
        });
    }
}