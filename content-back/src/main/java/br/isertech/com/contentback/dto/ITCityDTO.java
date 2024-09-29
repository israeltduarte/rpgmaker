package br.isertech.com.contentback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ITCityDTO {

    private String name;
    private String title;
    private String leader;
    private String size;
    private List<String> places;
    private List<String> people;
    private List<String> groups;
    private List<String> curiosities;
    private List<String> notes;

}
