package br.isertech.com.contentback.dto;

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
public class ITOpponentDTO {

    private String name;
    private String power;
    private Integer hp;
    private Integer tac0;
    private Integer ca;
    private List<String> weapons;
    private List<String> abilities;
    private LocalDateTime created;
    private LocalDateTime updated;

}
