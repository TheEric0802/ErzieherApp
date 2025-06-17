package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import casa.eric.erzieherapp.backend.model.TagebuchEintragDTO;
import casa.eric.erzieherapp.backend.repository.TagebuchEintragRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GruppentagebuchServiceTest {

    private final TagebuchEintragRepository tagebuchEintragRepository = mock(TagebuchEintragRepository.class);
    private final IdService idService = mock(IdService.class);
    private final KindService kindService = mock(KindService.class);
    private final GruppentagebuchService gruppentagebuchService = new GruppentagebuchService(tagebuchEintragRepository, idService, kindService);

    @Test
    void getAllTagebuchEintraege_ShouldReturnListOfTagebuchEintrag() {
        List<TagebuchEintrag> eintraege = List.of(new TagebuchEintrag(
                "ID1",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ), new TagebuchEintrag(
                "ID2",
                new Gruppe("GID2", "Gruppe2"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ));
        when(tagebuchEintragRepository.findAll()).thenReturn(eintraege);
        List<TagebuchEintrag> result = gruppentagebuchService.getAllTagebuchEintraege();
        assertEquals(eintraege, result);
    }

    @Test
    void getTagebuchEintragByGruppeAndDatum_ShouldReturnTagebuchEintrag() {
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID1",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        );
        when(tagebuchEintragRepository.findByGruppeIdAndDatum("GID1", LocalDate.now())).thenReturn(Optional.of(eintrag));
        TagebuchEintrag result = gruppentagebuchService.getTagebuchEintragByGruppeAndDatum("GID1", LocalDate.now());
        assertEquals(eintrag, result);
    }

    @Test
    void getTagebuchEintraegeByGruppeId_ShouldReturnListOfTagebuchEintrag() {
        List<TagebuchEintrag> eintraege = List.of(new TagebuchEintrag(
                "ID1",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ), new TagebuchEintrag(
                "ID2",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now().minusDays(1),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ));
        when(tagebuchEintragRepository.findByGruppeId("GID1")).thenReturn(eintraege);
        List<TagebuchEintrag> result = gruppentagebuchService.getTagebuchEintraegeByGruppeId("GID1");
        assertEquals(eintraege, result);
    }

    @Test
    void createTagebuchEintrag_ShouldCreateTagebuchEintrag() {
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID_CREATE",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        );
        when(idService.generateId()).thenReturn("ID_CREATE");
        when(tagebuchEintragRepository.findById("ID_CREATE")).thenReturn(Optional.of(eintrag));
        gruppentagebuchService.createTagebuchEintrag(new TagebuchEintragDTO(
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ));
        verify(tagebuchEintragRepository, times(1)).save(eintrag);
    }

    @Test
    void createInitialTagebuchEintrag_ShouldCreateInitialTagebuchEintrag() {
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID_INITIAL",
                new Gruppe("GID1", ""),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        );
        when(idService.generateId()).thenReturn("ID_INITIAL");
        when(kindService.getKinderByGruppeId("GID1")).thenReturn(List.of());
        when(tagebuchEintragRepository.findById("ID_INITIAL")).thenReturn(Optional.of(eintrag));
        gruppentagebuchService.createInitialTagebuchEintrag("GID1");
        verify(tagebuchEintragRepository, times(1)).save(eintrag);
    }

    @Test
    void updateTagebuchEintrag_ShouldSaveUpdatedEintrag() {
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID_UPDATE",
                new Gruppe("GID1", "Gruppe1"),
                LocalDate.now(),
                "",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        );
        when(tagebuchEintragRepository.findByGruppeIdAndDatum("GID1", LocalDate.now())).thenReturn(Optional.of(eintrag));
        TagebuchEintragDTO eintragDTO = new TagebuchEintragDTO(
                new Gruppe("GID1", "Gruppe1"), LocalDate.now(), "Test123", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppentagebuchService.updateTagebuchEintrag("GID1", LocalDate.now(), eintragDTO);
        verify(tagebuchEintragRepository, times(1)).save(eintrag.withEintrag("Test123"));
    }
}