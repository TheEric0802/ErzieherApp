package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.model.MitteilungDTO;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Mitteilung mitteilungToUpdate = mitteilungRepository.findById(id).get()
                .withTitle(mitteilung.title())
                .withContent(mitteilung.content());
        return mitteilungRepository.save(mitteilungToUpdate);
    }

    public void deleteMitteilung(String id) {
        mitteilungRepository.deleteById(id);
    }
}
