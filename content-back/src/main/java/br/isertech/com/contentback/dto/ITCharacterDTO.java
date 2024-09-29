package br.isertech.com.contentback.dto;

import br.isertech.com.contentback.enums.ITCharacterTypeEnum;
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
    private ITCharacterTypeEnum type;
    private Long reward;
    private String goal;
    private String powerId;
    private Boolean isRival;
    private String playerName;
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;

}
