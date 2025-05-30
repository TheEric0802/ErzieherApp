package casa.eric.erzieherapp.backend.model;

import lombok.With;

import java.util.List;

@With
public record Mitteilung(
        String id,
        String title,
        String content,
        List<String> gruppenIds
) {
    public Mitteilung(String id, String title, String content) {
        this(id, title, content, List.of());
    }
}
