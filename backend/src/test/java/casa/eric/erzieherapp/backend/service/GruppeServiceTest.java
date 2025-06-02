package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.GruppeDTO;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

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

    @Test
    void updateGruppe_shouldUpdateGruppe() {
        Gruppe gruppe = new Gruppe("ID2", "Gruppe2");
        when(gruppeRepository.findById("ID2")).thenReturn(java.util.Optional.of(gruppe));
        GruppeDTO gruppeDTO = new GruppeDTO("Gruppe2");
        gruppeService.updateGruppe("ID2", gruppeDTO);
        verify(gruppeRepository, times(1)).save(gruppe);
    }

    @Test
    void deleteGruppe_shouldDeleteGruppe() {
        when(gruppeRepository.existsById("ID1")).thenReturn(true);
        gruppeService.deleteGruppe("ID1");
        verify(gruppeRepository, times(1)).deleteById("ID1");
    }

    @Test
    void deleteGruppe_shouldThrowNoSuchElementException() {
        when(gruppeRepository.existsById("ID3")).thenReturn(false);
        assertThrows(NoSuchElementException.class, () -> gruppeService.deleteGruppe("ID3"));
    }
}