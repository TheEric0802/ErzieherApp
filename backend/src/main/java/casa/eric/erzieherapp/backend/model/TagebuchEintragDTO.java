package casa.eric.erzieherapp.backend.model;

import java.time.LocalDate;
import java.util.List;

public record TagebuchEintragDTO (
    Gruppe gruppe,
    LocalDate datum,
    String eintrag,
    List<Kind> anwesenheitUnbekannt,
    List<Kind> anwesend,
    List<Kind> krank,
    List<Kind> urlaub,
    List<Kind> unentschuldigt
) {
}
