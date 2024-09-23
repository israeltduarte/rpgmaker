package br.isertech.com.rpgmakerback.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AttributeDTO {

    @NotBlank
    private Integer value;
    @NotBlank
    private String name;
    @NotBlank
    private String items;

}
