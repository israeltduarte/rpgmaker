package br.isertech.com.contentback.dto;

import br.isertech.com.contentback.enums.ITCharacterType;
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
public class ITCharacterDTO {

    private String name;
    private ITCharacterType type;
    private String player;
    private String goal;
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;

}
