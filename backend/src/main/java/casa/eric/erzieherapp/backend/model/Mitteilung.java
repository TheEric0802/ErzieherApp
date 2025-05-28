package casa.eric.erzieherapp.backend.model;

import lombok.With;

@With
public record Mitteilung(
        String id,
        String title,
        String content
) {
}
