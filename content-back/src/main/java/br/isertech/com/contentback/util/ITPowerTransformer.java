package br.isertech.com.contentback.util;

import br.isertech.com.contentback.dto.ITPowerDTO;
import br.isertech.com.contentback.entity.ITPower;

public class ITPowerTransformer {

    public static ITPower fromDTO(ITPowerDTO dto) {
        return ITPower.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .particles(dto.getParticles())
                .ideas(dto.getIdeas())
                .build();
    }
}
