package br.isertech.com.contentback.entity;

import br.isertech.com.contentback.enums.ITPowerCategory;
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
public class ITPower extends RepresentationModel<ITPower> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itpower-uuid-generator")
    @GenericGenerator(
            name = "itpower-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITPower")
    )
    private String id;
    private String name;
    private ITPowerCategory category;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itpower_ideas", joinColumns = @JoinColumn(name = "itpower_id"))
    private List<String> ideas;

    private String particles;
    private LocalDateTime created;
    private LocalDateTime updated;
}
