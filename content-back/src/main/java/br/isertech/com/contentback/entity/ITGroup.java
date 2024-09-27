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
public class ITGroup extends RepresentationModel<ITGroup> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "itgroup-uuid-generator")
    @GenericGenerator(
            name = "itgroup-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITGroup")
    )
    private String id;
    private String name;
    private String leader;
    private String description;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "itgroup_notes", joinColumns = @JoinColumn(name = "itgroup_id"))
    private List<String> notes;
    private LocalDateTime created;
    private LocalDateTime updated;
}
