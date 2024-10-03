package br.isertech.com.contentback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ITTask extends RepresentationModel<ITPower> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "ittask-uuid-generator")
    @GenericGenerator(
            name = "ittask-uuid-generator",
            strategy = "br.isertech.com.contentback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITTask")
    )
    private String id;
    private String name;
    private String description;
    private LocalDateTime created;
    private LocalDateTime updated;
}
