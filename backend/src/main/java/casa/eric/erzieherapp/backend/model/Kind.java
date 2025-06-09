package casa.eric.erzieherapp.backend.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

public record Kind(
        String id,
        String firstName,
        String lastName,
        @DBRef
        Gruppe gruppe
) {
}
