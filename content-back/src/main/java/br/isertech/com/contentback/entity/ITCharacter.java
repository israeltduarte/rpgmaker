package br.isertech.com.contentback.entity;

import br.isertech.com.contentback.enums.ITCharacterTypeEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private ITCharacterTypeEnum type;
    private String tendency;
    private Long reward;
    private String goal;
    private Boolean isRival;
    private String playerName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itpower_id")
    @JsonIgnore
    private ITPower power;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itcharacter_notes", joinColumns = @JoinColumn(name = "itcharacter_id"))
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;

}

