package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MitteilungServiceTest {

    private final MitteilungRepository mitteilungRepository = mock(MitteilungRepository.class);
    private final MitteilungService mitteilungService = new MitteilungService(mitteilungRepository);

    @Test
    void getAllMitteilungen_ShouldReturnListOfMitteilungen() {
        List<Mitteilung> mitteilungen = List.of(new Mitteilung("Titel1", "Content1"),new Mitteilung("Titel2", "Content2"));
        when(mitteilungRepository.findAll()).thenReturn(mitteilungen);
        List<Mitteilung> result = mitteilungService.getAllMitteilungen();
        assertEquals(mitteilungen, result);
    }
}