package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.model.KindDTO;
import casa.eric.erzieherapp.backend.repository.KindRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class KindService {

    private final KindRepository kindRepository;
    private final IdService idService;

    public List<Kind> getAllKinder() {
        return kindRepository.findAll();
    }

    public Kind createKind(KindDTO kind) {
        return kindRepository.save(new Kind(idService.generateId(), kind.firstName(), kind.lastName(), kind.gruppe()));
    }
}
