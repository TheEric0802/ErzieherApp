package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.model.MitteilungDTO;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class MitteilungService {

    private final MitteilungRepository mitteilungRepository;
    private final IdService idService;

    public List<Mitteilung> getAllMitteilungen() {
        return mitteilungRepository.findAll();
    }

    public Mitteilung createMitteilung(MitteilungDTO mitteilung) {
        return mitteilungRepository.save(new Mitteilung(idService.generateId() ,mitteilung.title(), mitteilung.content(), mitteilung.gruppenIds()));
    }

    public Mitteilung updateMitteilung(String id, MitteilungDTO mitteilung) {
        Mitteilung mitteilungToUpdate = mitteilungRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Mitteilung not found"))
                .withTitle(mitteilung.title())
                .withContent(mitteilung.content())
                .withGruppenIds(mitteilung.gruppenIds());
        return mitteilungRepository.save(mitteilungToUpdate);
    }

    public void deleteMitteilung(String id) {
        if (!mitteilungRepository.existsById(id)) {
            throw new NoSuchElementException("Mitteilung not found");
        }
        mitteilungRepository.deleteById(id);
    }
}
