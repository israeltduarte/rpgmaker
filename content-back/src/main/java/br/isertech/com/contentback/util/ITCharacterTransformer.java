package br.isertech.com.contentback.util;

import br.isertech.com.contentback.dto.ITCharacterDTO;
import br.isertech.com.contentback.entity.ITCharacter;

public class ITCharacterTransformer {

    public static ITCharacter fromDTO(ITCharacterDTO dto) {
        return ITCharacter.builder()
                .name(dto.getName())
                .type(dto.getType())
                .reward(dto.getReward())
                .goal(dto.getGoal())
                .notes(dto.getNotes())
                .build();
    }
}
