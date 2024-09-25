package br.isertech.com.contentback.util;

import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITWeapon;

public class ITWeaponTransformer {

    public static ITWeapon fromDTO(ITWeaponDTO dto) {
        return ITWeapon.builder()
                .name(dto.getName())
                .type(dto.getType())
                .titles(dto.getTitles())
                .owner(dto.getOwner())
                .ranking(dto.getRanking())
                .notes(dto.getNotes())
                .build();
    }
}
