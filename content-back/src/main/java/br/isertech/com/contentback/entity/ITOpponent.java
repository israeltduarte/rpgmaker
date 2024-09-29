package br.isertech.com.contentback.entity;

import jakarta.persistence.*;
import lombok.*;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ITOpponent extends RepresentationModel<ITOpponent> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itopponent-uuid-generator")
    @GenericGenerator(
            name = "itopponent-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITOpponent")
    )
    private String id;
    private String name;
    private String power;
    private Integer hp;
    private Integer tac0;
    private Integer ca;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itopponent_weapons", joinColumns = @JoinColumn(name = "itopponent_id"))
    private List<String> weapons;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itopponent_abilities", joinColumns = @JoinColumn(name = "itopponent_id"))
    private List<String> abilities;

    private LocalDateTime created;
    private LocalDateTime updated;
}
