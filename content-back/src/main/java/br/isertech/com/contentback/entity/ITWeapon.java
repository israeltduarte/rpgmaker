package br.isertech.com.contentback.entity;

import br.isertech.com.contentback.enums.ITWeaponType;
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
public class ITWeapon extends RepresentationModel<ITWeapon> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itweapon-uuid-generator")
    @GenericGenerator(
            name = "itweapon-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITWeapon")
    )
    private String id;
    private String name;
    private ITWeaponType type;
    @Column(unique = true)
    private Long power;
    private String owner;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itweapon_titles", joinColumns = @JoinColumn(name = "itweapon_id"))
    private List<String> titles;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itweapon_notes", joinColumns = @JoinColumn(name = "itweapon_id"))
    private List<String> notes;

    private LocalDateTime created;
    private LocalDateTime updated;
}
