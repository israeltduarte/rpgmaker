package br.isertech.com.contentback.entity;

import br.isertech.com.contentback.enums.ITCharacterType;
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
public class ITCharacter extends RepresentationModel<ITCharacter> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itcharacter-uuid-generator")
    @GenericGenerator(
            name = "itcharacter-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITCharacter")
    )
    private String id;
    private String name;
    private ITCharacterType type;
    private String goal;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "notes", joinColumns = @JoinColumn(name = "it_character_id"))
    private List<String> notes;

    private LocalDateTime created;
    private LocalDateTime updated;

}

