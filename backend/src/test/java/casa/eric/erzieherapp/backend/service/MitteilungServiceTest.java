package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.model.MitteilungDTO;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MitteilungServiceTest {

    private final MitteilungRepository mitteilungRepository = mock(MitteilungRepository.class);
    private final IdService idService = mock(IdService.class);
    private final MitteilungService mitteilungService = new MitteilungService(mitteilungRepository, idService);

    @Test
    void getAllMitteilungen_ShouldReturnListOfMitteilungen() {
        List<Mitteilung> mitteilungen = List.of(new Mitteilung("ID1","Titel1", "Content1"),new Mitteilung("ID2","Titel2", "Content2"));
        when(mitteilungRepository.findAll()).thenReturn(mitteilungen);
        List<Mitteilung> result = mitteilungService.getAllMitteilungen();
        assertEquals(mitteilungen, result);
    }

    @Test
    void createMitteilung_ShouldCreateMitteilung() {
        Mitteilung mitteilung = new Mitteilung("CreateID", "TitelCreate", "ContentCreate");
        when(idService.generateId()).thenReturn("CreateID");
        mitteilungService.createMitteilung(new MitteilungDTO("TitelCreate", "ContentCreate"));
        verify(mitteilungRepository, times(1)).save(mitteilung);
    }

    @Test
    void updateMitteilung_ShouldUpdateMitteilung() {
        Mitteilung mitteilung = new Mitteilung("UpdateID", "TitelUpdate", "ContentUpdate");
        when(mitteilungRepository.findById("UpdateID")).thenReturn(java.util.Optional.of(mitteilung));
        MitteilungDTO mitteilungDTO = new MitteilungDTO("TitelUpdated", "ContentUpdated");
        mitteilungService.updateMitteilung("UpdateID", mitteilungDTO);
        Mitteilung mitteilungUpdated = mitteilung.withTitle(mitteilungDTO.title()).withContent(mitteilungDTO.content());
        verify(mitteilungRepository, times(1)).save(mitteilungUpdated);
    }

    @Test
    void deleteMitteilung_ShouldDeleteMitteilung() {
        when(mitteilungRepository.existsById("DeleteID")).thenReturn(true);
        mitteilungService.deleteMitteilung("DeleteID");
        verify(mitteilungRepository, times(1)).deleteById("DeleteID");
    }

    @Test
    void deleteMitteilung_ShouldThrowException_WhenMitteilungDoesNotExist() {
        when(mitteilungRepository.existsById("DeleteID2")).thenReturn(false);
        assertThrows(NoSuchElementException.class, () -> mitteilungService.deleteMitteilung("DeleteID2"));
    }
}