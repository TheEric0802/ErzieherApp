package casa.eric.erzieherapp.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.DBRef;

@With
public record Kind(
        String id,
        String firstName,
        String lastName,
        @DBRef
        Gruppe gruppe
) {
}
