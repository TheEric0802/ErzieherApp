package casa.eric.erzieherapp.backend.model;

import java.util.UUID;

public record Mitteilung(
        String id,
        String title,
        String content
) {
    public Mitteilung(String title, String content) {
        this(UUID.randomUUID().toString(), title, content);
    }
}
