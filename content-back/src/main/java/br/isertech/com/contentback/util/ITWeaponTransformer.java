package br.isertech.com.contentback.util;

import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITWeapon;

public class ITWeaponTransformer {

    public static ITWeapon fromDTO(ITWeaponDTO dto) {
        return ITWeapon.builder()
                .name(dto.getName())
                .type(dto.getType())
                .power(dto.getPower())
                .owner(dto.getOwner())
                .titles(dto.getTitles())
                .notes(dto.getNotes())
                .build();
    }
}
