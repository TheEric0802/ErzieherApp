package casa.eric.erzieherapp.backend.model;

import java.util.List;

public record MitteilungDTO(
        String title,
        String content,
        List<String> gruppenIds
) {
    public MitteilungDTO(String title, String content) {
        this(title, content, List.of());
    }
}
