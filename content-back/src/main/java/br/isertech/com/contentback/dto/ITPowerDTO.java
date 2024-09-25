package br.isertech.com.contentback.dto;

import br.isertech.com.contentback.enums.ITCategory;
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
public class ITPowerDTO {

    private String name;
    private ITCategory category;
    private List<String> ideas;
    private String particles;
    private LocalDateTime created;
    private LocalDateTime updated;

}
