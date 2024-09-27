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
public class ITGroupDTO {

    private String name;
    private String leader;
    private String description;
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;

}
