import { render} from '@testing-library/react';
import About from "../pages/About";



describe('About page', () => {
    test('test to see classes exist', () => {
      const { container} = render(<About/>)    
      expect(container.firstChild).toHaveClass('about-container');
      expect(container.firstChild?.firstChild).toHaveClass('about-title');
    });

  });

