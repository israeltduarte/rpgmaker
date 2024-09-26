package br.isertech.com.rpgmakerback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class ITUser extends RepresentationModel<ITUser> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "ituser-uuid-generator")
    @GenericGenerator(
            name = "ituser-uuid-generator",
            strategy = "br.isertech.com.rpgmakerback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITUser")
    )
    private String id;
    private String name;
    private String lastName;
    private String email;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;
    private LocalDateTime created;
    private LocalDateTime updated;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "ITUSERS_ITROLES",
            joinColumns = @JoinColumn(name = "ITUSER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ITROLE_ID")
    )
    @JsonIgnore
    @ToString.Exclude
    private List<ITRole> roles;

}

