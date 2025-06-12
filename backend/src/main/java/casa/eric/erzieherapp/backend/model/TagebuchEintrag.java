package casa.eric.erzieherapp.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document
@CompoundIndex(def = "{'gruppe': 1, 'datum': 1}", unique = true)
@With
public record TagebuchEintrag(
        String id,
        @DBRef
        Gruppe gruppe,
        LocalDate datum,
        String eintrag,
        @DBRef
        List<Kind> anwesenheitUnbekannt,
        @DBRef
        List<Kind> anwesend,
        @DBRef
        List<Kind> krank,
        @DBRef
        List<Kind> urlaub,
        @DBRef
        List<Kind> unentschuldigt
) {
}
