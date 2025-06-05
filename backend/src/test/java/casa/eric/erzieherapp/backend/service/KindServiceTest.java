package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.model.KindDTO;
import casa.eric.erzieherapp.backend.repository.KindRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class KindServiceTest {

    private final KindRepository kindRepository = mock(KindRepository.class);
    private final IdService idService = mock(IdService.class);
    private final KindService kindService = new KindService(kindRepository, idService);

    @Test
    void getAllKinder() {
        List<Kind> kinder = List.of(new Kind("ID1", "Vorname1", "Nachname1", new Gruppe("GID1", "Gruppe1")),
                new Kind("ID2", "Vorname2", "Nachname2", new Gruppe("GID2", "Gruppe2")));
        when(kindRepository.findAll()).thenReturn(kinder);
        List<Kind> result = kindService.getAllKinder();
        assertEquals(kinder, result);
    }

    @Test
    void createKind() {
        Kind kind = new Kind("ID1", "Vorname1", "Nachname1", new Gruppe("GID1", "Gruppe1"));
        when(idService.generateId()).thenReturn("ID1");
        verify(kindRepository, times(1)).save(kind);
    }
}