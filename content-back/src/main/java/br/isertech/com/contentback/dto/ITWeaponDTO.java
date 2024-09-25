package br.isertech.com.contentback.dto;

import br.isertech.com.contentback.enums.ITWeaponType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ITWeaponDTO {

    private String name;
    private Integer ranking;
    private String owner;
    private ITWeaponType type;
    private List<String> titles;
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;

}