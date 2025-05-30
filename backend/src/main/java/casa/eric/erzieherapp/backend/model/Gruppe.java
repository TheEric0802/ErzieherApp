package casa.eric.erzieherapp.backend.model;

import lombok.With;

@With
public record Gruppe(
        String id,
        String name
) {
}
