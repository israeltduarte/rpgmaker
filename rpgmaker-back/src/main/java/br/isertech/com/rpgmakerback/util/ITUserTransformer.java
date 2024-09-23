package br.isertech.com.rpgmakerback.util;

import br.isertech.com.rpgmakerback.dto.UserDTO;
import br.isertech.com.rpgmakerback.entity.ITUser;

public class ITUserTransformer {

    private ITUserTransformer() {
    }

    public static ITUser fromDTO(UserDTO dto) {
        return ITUser.builder()
                .name(dto.getName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
    }

    public static ITUser fromDTO(ITUser user, UserDTO dto) {
        ITUser updatedUser = fromDTO(dto);
        updatedUser.setId(user.getId());

        return updatedUser;
    }
}
