package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.GruppeDTO;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GruppeServiceTest {

    private final GruppeRepository gruppeRepository = mock(GruppeRepository.class);
    private final IdService idService = mock(IdService.class);
    private final GruppeService gruppeService = new GruppeService(gruppeRepository, idService);

    @Test
    void getAllGruppen_shouldReturnListOfGruppen() {
        List<Gruppe> gruppen = List.of(new Gruppe("ID1", "Gruppe1"), new Gruppe("ID2", "Gruppe2"));
        when(gruppeRepository.findAll()).thenReturn(gruppen);
        List<Gruppe> result = gruppeService.getAllGruppen();
        assertEquals(gruppen, result);
    }

    @Test
    void createGruppe() {
        Gruppe gruppe = new Gruppe("ID1", "Gruppe1");
        when(idService.generateId()).thenReturn("ID1");
        gruppeService.createGruppe(new GruppeDTO("Gruppe1"));
        verify(gruppeRepository, times(1)).save(gruppe);
    }
}