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
    private Integer ranking;
    private String owner;
    private ITWeaponType type;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "weapon_titles", joinColumns = @JoinColumn(name = "it_weapon_id"))
    private List<String> titles;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "weapon_notes", joinColumns = @JoinColumn(name = "it_weapon_id"))
    private List<String> notes;

    private LocalDateTime created;
    private LocalDateTime updated;
}
