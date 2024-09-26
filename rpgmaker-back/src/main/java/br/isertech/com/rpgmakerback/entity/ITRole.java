package br.isertech.com.rpgmakerback.entity;

import br.isertech.com.rpgmakerback.enums.ITRoleType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ITRole implements GrantedAuthority, Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "role-uuid-generator")
    @GenericGenerator(
            name = "role-uuid-generator",
            strategy = "br.isertech.com.rpgmakerback.util.IserUUIDGenerator",
            parameters = @Parameter(name = "prefix", value = "ITRole")
    )
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true, length = 30)
    private ITRoleType name;

    @Override
    @JsonIgnore
    public String getAuthority() {
        return this.name.toString();
    }
}
