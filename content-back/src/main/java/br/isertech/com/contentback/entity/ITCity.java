package br.isertech.com.contentback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ITCity extends RepresentationModel<ITCity> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itcity-uuid-generator")
    @GenericGenerator(
            name = "itcity-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITCity")
    )
    private String id;
    private String name;
    private String title;
    private String leader;
    private String size;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcity_places", joinColumns = @JoinColumn(name = "itcity_id"))
    private List<String> places;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcity_people", joinColumns = @JoinColumn(name = "itcity_id"))
    private List<String> people;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcity_groups", joinColumns = @JoinColumn(name = "itcity_id"))
    private List<String> groups;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcity_curiosities", joinColumns = @JoinColumn(name = "itcity_id"))
    private List<String> curiosities;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcity_notes", joinColumns = @JoinColumn(name = "itcity_id"))
    private List<String> notes;

    private LocalDateTime created;
    private LocalDateTime updated;

}
