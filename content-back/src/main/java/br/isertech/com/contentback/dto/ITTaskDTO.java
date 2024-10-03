package br.isertech.com.contentback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ITTaskDTO {

    private String name;
    private String description;
    private LocalDateTime created;
    private LocalDateTime updated;

}
